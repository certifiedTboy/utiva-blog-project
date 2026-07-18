// Import necessary hooks and components from React and other libraries.
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Check, Code2, Image, Search } from "lucide-react";
import { micromark } from "micromark";
import { gfm, gfmHtml } from "micromark-extension-gfm";
// UI components from shadcn/ui.
import { FormControl } from "@/components/ui/form";
import { supportedLanguages } from "@/lib/mock-data";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useFileUpload } from "@/hooks/usefile-upload";

// Define a type for the supported programming languages.
type Language = (typeof supportedLanguages)[number];

/**
 * A rich markdown editor component with features like code block language detection,
 * image pasting/uploading, and a live preview.
 */
export function MarkdownContentField({
  field,
}: {
  // The field object from react-hook-form.
  field: {
    value?: string;
    onChange: (value: string) => void;
    onBlur?: React.FocusEventHandler<HTMLTextAreaElement>;
    name?: string;
    ref?: React.Ref<HTMLTextAreaElement>;
  };
}) {
  // Refs for direct DOM manipulation.
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const { handleFileSelect, handlePaste } = useFileUpload(textareaRef, field);

  /**
   * Ref to store the starting position of the current code fence (```).
   * This is used to correctly replace the language identifier.
   */
  const fenceStartRef = useRef<number | null>(null);

  // State for managing the language selection menu for code blocks.
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [languageQuery, setLanguageQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  // Memoize the conversion of markdown to HTML for the preview pane.
  // This prevents re-rendering on every keystroke if the content hasn't changed.
  const renderedHtml = useMemo(() => {
    if (!field.value) return "";
    return micromark(field.value, {
      extensions: [gfm()],
      htmlExtensions: [gfmHtml()],
      // These are needed to allow raw HTML and custom protocols in the markdown.
      allowDangerousHtml: true,
      allowDangerousProtocol: true,
    });
  }, [field.value]);

  // Memoize the list of filtered languages based on the user's query.
  // This improves performance by avoiding re-filtering on every render.
  const filteredLanguages = useMemo(() => {
    const query = languageQuery.trim().toLowerCase();

    // If there's no query, return all supported languages.
    if (!query) {
      return supportedLanguages;
    }

    // Filter languages based on label, value, or aliases.
    return supportedLanguages.filter((language) => {
      return (
        language.label.toLowerCase().includes(query) ||
        language.value.toLowerCase().includes(query) ||
        language.aliases.some((alias) => alias.toLowerCase().includes(query))
      );
    });
  }, [languageQuery]);

  // Reset the active index whenever the language query changes.
  useEffect(() => {
    setActiveIndex(0);
  }, [languageQuery]);

  // Effect to handle clicks outside the component to close the language menu.
  // This improves user experience by allowing an intuitive way to close the menu.
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        closeLanguageMenu();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  /**
   * Resets the state related to the language menu, effectively closing it.
   */
  function closeLanguageMenu() {
    setShowLanguageMenu(false);
    setLanguageQuery("");
    setActiveIndex(0);
    fenceStartRef.current = null;
  }

  /**
   * Analyzes the text before the cursor to detect if a code fence (```)
   * has been typed, and if so, opens the language selection menu.
   */
  function detectCodeFence(value: string, cursorPosition: number) {
    const contentBeforeCursor = value.slice(0, cursorPosition);
    const currentLineStart = contentBeforeCursor.lastIndexOf("\n") + 1;
    const currentLine = contentBeforeCursor.slice(currentLineStart);

    /**
     * This regex matches a code fence at the beginning of a line.
     * It allows for optional whitespace before the backticks and captures
     * the language identifier that follows.
     * ```
     * ```j
     * ```javascript
     */
    const match = currentLine.match(/^\s*```([a-zA-Z0-9+#.-]*)$/);

    if (!match) {
      closeLanguageMenu();
      return;
    }

    // Store the starting position of the fence and show the menu.
    const backtickOffset = currentLine.indexOf("```");
    fenceStartRef.current = currentLineStart + backtickOffset;
    setLanguageQuery(match[1] ?? "");
    setShowLanguageMenu(true);
  }

  /**
   * Handles the `onChange` event of the textarea. It updates the form field's
   * value and calls `detectCodeFence` to check for language selection triggers.
   */
  function handleChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    const value = event.target.value;
    const cursorPosition = event.target.selectionStart;

    field.onChange(value);
    detectCodeFence(value, cursorPosition);
  }

  /**
   * Inserts the selected programming language into the code fence.
   * @param language The language object selected from the menu.
   */
  function selectLanguage(language: Language) {
    const textarea = textareaRef.current;
    const fenceStart = fenceStartRef.current;

    if (!textarea || fenceStart === null) {
      return;
    }

    const value = textarea.value;
    const cursorPosition = textarea.selectionStart;

    /**
     * Reconstructs the textarea value with the selected language,
     * a new line for code, and a closing fence.
     */
    const beforeFence = value.slice(0, fenceStart);
    const afterCursor = value.slice(cursorPosition);

    const codeBlock = `\`\`\`${language.value}\n\n\`\`\``;

    const updatedValue = beforeFence + codeBlock + afterCursor;

    field.onChange(updatedValue);
    closeLanguageMenu();

    /**
     * Moves the cursor to the empty line inside the newly created code block,
     * providing a seamless writing experience.
     */
    const nextCursorPosition =
      beforeFence.length + 3 + language.value.length + 1;

    requestAnimationFrame(() => {
      textarea.focus();
      textarea.setSelectionRange(nextCursorPosition, nextCursorPosition);
    });
  }

  /**
   * Handles keydown events for keyboard navigation within the language menu and for tab indentation.
   */
  function handleKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    // Handle navigation within the language menu.
    if (showLanguageMenu && filteredLanguages.length > 0) {
      if (event.key === "ArrowDown") {
        event.preventDefault();

        setActiveIndex((currentIndex) =>
          currentIndex >= filteredLanguages.length - 1 ? 0 : currentIndex + 1,
        );

        return;
      }

      if (event.key === "ArrowUp") {
        event.preventDefault();

        setActiveIndex((currentIndex) =>
          currentIndex <= 0 ? filteredLanguages.length - 1 : currentIndex - 1,
        );

        return;
      }

      if (event.key === "Enter" || (event.key === "Tab" && !event.shiftKey)) {
        event.preventDefault();

        const selectedLanguage = filteredLanguages[activeIndex];

        if (selectedLanguage) {
          selectLanguage(selectedLanguage);
        }

        return;
      }

      if (event.key === "Escape") {
        event.preventDefault();
        closeLanguageMenu();
        return;
      }
    }

    /**
     * Handles the Tab key for indentation when the language menu is not open.
     * It inserts two spaces at the cursor position.
     */
    if (event.key === "Tab" && !event.shiftKey) {
      event.preventDefault();

      const textarea = event.currentTarget;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const value = textarea.value;

      const updatedValue = value.slice(0, start) + "  " + value.slice(end);

      field.onChange(updatedValue);

      requestAnimationFrame(() => {
        textarea.setSelectionRange(start + 2, start + 2);
      });
    }
  }

  return (
    <FormControl>
      <div ref={containerRef} className="relative">
        <Textarea
          {...field}
          // Combine the ref from react-hook-form with our local ref.
          ref={(element) => {
            textareaRef.current = element;

            if (typeof field.ref === "function") {
              field.ref(element);
            }
          }}
          value={field.value ?? ""}
          placeholder={
            "Start writing your post...\n\nUse fenced Markdown code blocks, for example:\n```javascript"
          }
          className="
            min-h-[400px]
            resize-y
            rounded-xl
            px-4
            py-4
            font-mono
            text-sm
            leading-6
          "
          data-testid="input-content"
          spellCheck={false}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onPaste={handlePaste}
        />
        {/* Button to trigger the hidden file input for image uploads. */}
        <div className="absolute top-2 right-2 flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            className="cursor-pointer"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
          >
            <Image className="w-4 h-4 mr-2" />
            Upload Image
          </Button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelect}
            accept="image/*"
            className="hidden"
          />
        </div>
        {/* Live preview pane for the markdown content. */}
        <div className="mt-4 rounded-xl border border-border bg-card p-4">
          <p className="text-sm text-muted-foreground mb-2">Preview</p>
          <div
            className="prose prose-sm dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{
              __html: renderedHtml,
            }}
          />
        </div>

        {/* The language selection menu, rendered conditionally. */}
        {showLanguageMenu && (
          <div
            role="listbox"
            aria-label="Supported programming languages"
            className="
              absolute
              left-3
              top-14
              z-50
              w-[min(22rem,calc(100%-1.5rem))]
              overflow-hidden
              rounded-xl
              border
              border-border/70
              bg-popover/95
              text-popover-foreground
              shadow-xl
              backdrop-blur-md
              animate-in
              fade-in-0
              zoom-in-95
              duration-150
            "
          >
            {/* Header of the language menu. */}
            <div className="border-b border-border/60 px-3 py-3">
              <div className="flex items-center gap-2">
                <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10">
                  <Code2 className="size-4 text-primary" />
                </div>

                <div className="min-w-0">
                  <p className="text-sm font-medium">Select a language</p>

                  <p className="truncate text-xs text-muted-foreground">
                    Continue typing to filter the list
                  </p>
                </div>
              </div>

              {/* Display the current search query. */}
              {languageQuery && (
                <div className="mt-3 flex items-center gap-2 rounded-lg bg-muted/60 px-2.5 py-2">
                  <Search className="size-3.5 text-muted-foreground" />

                  <span className="truncate font-mono text-xs">
                    {languageQuery}
                  </span>
                </div>
              )}
            </div>

            {/* Scrollable list of filtered languages. */}
            <div className="max-h-64 overflow-y-auto p-1.5 language-menu-scrollbar">
              {filteredLanguages.length > 0 ? (
                filteredLanguages.map((language, index) => {
                  const isActive = index === activeIndex;

                  return (
                    <button
                      key={`${language.label}-${language.value}`}
                      type="button"
                      role="option"
                      aria-selected={isActive}
                      className={`
                        flex
                        w-full
                        items-center
                        justify-between
                        gap-3
                        rounded-lg
                        px-3
                        py-2.5
                        text-left
                        transition-colors
                        ${
                          isActive
                            ? "bg-primary text-primary-foreground"
                            : "hover:bg-muted"
                        }
                      `}
                      onMouseEnter={() => setActiveIndex(index)}
                      onMouseDown={(event) => {
                        /**
                         * Prevents the textarea from losing focus, which would close the menu.
                         */
                        event.preventDefault();
                      }}
                      onClick={() => selectLanguage(language)}
                    >
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium">
                          {language.label}
                        </p>

                        <p
                          className={`
                            truncate font-mono text-xs
                            ${
                              isActive
                                ? "text-primary-foreground/75"
                                : "text-muted-foreground"
                            }
                          `}
                        >
                          ```{language.value}
                        </p>
                      </div>

                      {isActive && <Check className="size-4 shrink-0" />}
                    </button>
                  );
                })
              ) : (
                <div className="px-4 py-8 text-center">
                  <Code2 className="mx-auto mb-2 size-6 text-muted-foreground" />

                  <p className="text-sm font-medium">No language found</p>

                  <p className="mt-1 text-xs text-muted-foreground">
                    Try another language name or alias.
                  </p>
                </div>
              )}
            </div>

            {/* Footer with keyboard navigation hints. */}
            <div className="flex items-center gap-3 border-t border-border/60 bg-muted/30 px-3 py-2 text-[11px] text-muted-foreground">
              <span>
                <kbd className="rounded border bg-background px-1.5 py-0.5">
                  ↑↓
                </kbd>{" "}
                navigate
              </span>

              <span>
                <kbd className="rounded border bg-background px-1.5 py-0.5">
                  Enter
                </kbd>{" "}
                select
              </span>

              <span>
                <kbd className="rounded border bg-background px-1.5 py-0.5">
                  Esc
                </kbd>{" "}
                close
              </span>
            </div>
          </div>
        )}
      </div>
    </FormControl>
  );
}
