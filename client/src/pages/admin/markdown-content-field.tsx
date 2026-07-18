import React, { useEffect, useMemo, useRef, useState } from "react";
import { Check, Code2, Search } from "lucide-react";
import { micromark } from "micromark";
import { gfm, gfmHtml } from "micromark-extension-gfm";
import { FormControl } from "@/components/ui/form";
import { supportedLanguages } from "@/lib/mock-data";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";

type Language = (typeof supportedLanguages)[number];

export function MarkdownContentField({
  field,
}: {
  field: {
    value?: string;
    onChange: (value: string) => void;
    onBlur?: React.FocusEventHandler<HTMLTextAreaElement>;
    name?: string;
    ref?: React.Ref<HTMLTextAreaElement>;
  };
}) {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [languageQuery, setLanguageQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const { toast } = useToast();

  /*
   * Stores the position where the latest opening code fence begins.
   * For example, the index of the first backtick in ```typescript.
   */
  const fenceStartRef = useRef<number | null>(null);

  const renderedHtml = useMemo(() => {
    if (!field.value) return "";
    return micromark(field.value, {
      extensions: [gfm()],
      htmlExtensions: [gfmHtml()],
      allowDangerousHtml: true,
      allowDangerousProtocol: true,
    });
  }, [field.value]);

  const filteredLanguages = useMemo(() => {
    const query = languageQuery.trim().toLowerCase();

    if (!query) {
      return supportedLanguages;
    }

    return supportedLanguages.filter((language) => {
      return (
        language.label.toLowerCase().includes(query) ||
        language.value.toLowerCase().includes(query) ||
        language.aliases.some((alias) => alias.toLowerCase().includes(query))
      );
    });
  }, [languageQuery]);

  useEffect(() => {
    setActiveIndex(0);
  }, [languageQuery]);

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

  function closeLanguageMenu() {
    setShowLanguageMenu(false);
    setLanguageQuery("");
    setActiveIndex(0);
    fenceStartRef.current = null;
  }

  function detectCodeFence(value: string, cursorPosition: number) {
    const contentBeforeCursor = value.slice(0, cursorPosition);
    const currentLineStart = contentBeforeCursor.lastIndexOf("\n") + 1;

    const currentLine = contentBeforeCursor.slice(currentLineStart);

    /*
     * Matches:
     * ```
     * ```j
     * ```javascript
     *
     * It only opens for a code fence at the beginning of the current line,
     * allowing optional spaces before the fence.
     */
    const match = currentLine.match(/^\s*```([a-zA-Z0-9+#.-]*)$/);

    if (!match) {
      closeLanguageMenu();
      return;
    }

    const backtickOffset = currentLine.indexOf("```");

    fenceStartRef.current = currentLineStart + backtickOffset;
    setLanguageQuery(match[1] ?? "");
    setShowLanguageMenu(true);
  }

  function handleChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    const value = event.target.value;
    const cursorPosition = event.target.selectionStart;

    field.onChange(value);
    detectCodeFence(value, cursorPosition);
  }

  async function handleImageUpload(file: File) {
    // This is a mock upload function.
    // In a real application, you would upload the file to your server or a cloud storage service
    // and get a URL in return.
    console.log("Uploading image:", file.name);
    toast({
      title: "Uploading Image...",
      description: "Please wait while the image is being uploaded.",
    });

    return new Promise<string>((resolve) => {
      setTimeout(() => {
        const mockUrl = URL.createObjectURL(file);
        console.log("Mock URL:", mockUrl);
        toast({
          title: "Image Uploaded",
          description: "The image has been added to your post.",
        });
        resolve(mockUrl);
      }, 1000);
    });
  }

  async function handlePaste(event: React.ClipboardEvent<HTMLTextAreaElement>) {
    const imageItem = Array.from(event.clipboardData.items).find((item) =>
      item.type.startsWith("image/"),
    );

    // Allow normal text pasting when no image exists.
    if (!imageItem) return;

    const file = imageItem.getAsFile();
    if (!file) return;

    event.preventDefault();

    const textarea = event.currentTarget;

    // Capture these before the asynchronous upload.
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const currentValue = textarea.value;

    try {
      const imageUrl = await handleImageUpload(file);

      if (!imageUrl) return;

      // Valid Markdown image syntax.
      const imageMarkdown = `\n![Pasted image](${imageUrl})\n`;

      const newValue =
        currentValue.slice(0, start) + imageMarkdown + currentValue.slice(end);

      field.onChange(newValue);

      const newCursorPosition = start + imageMarkdown.length;

      requestAnimationFrame(() => {
        const currentTextarea = textareaRef.current;

        if (!currentTextarea) return;

        currentTextarea.focus();
        currentTextarea.setSelectionRange(newCursorPosition, newCursorPosition);
      });
    } catch (error) {
      console.error("Unable to paste image:", error);
    }
  }

  function selectLanguage(language: Language) {
    const textarea = textareaRef.current;
    const fenceStart = fenceStartRef.current;

    if (!textarea || fenceStart === null) {
      return;
    }

    const value = textarea.value;
    const cursorPosition = textarea.selectionStart;

    /*
     * Replace everything between the opening ``` and the cursor
     * with the selected language, then create the code body and
     * closing fence.
     */
    const beforeFence = value.slice(0, fenceStart);
    const afterCursor = value.slice(cursorPosition);

    const codeBlock = `\`\`\`${language.value}\n\n\`\`\``;

    const updatedValue = beforeFence + codeBlock + afterCursor;

    field.onChange(updatedValue);
    closeLanguageMenu();

    /*
     * Place the cursor on the empty line inside the code block.
     */
    const nextCursorPosition =
      beforeFence.length + 3 + language.value.length + 1;

    requestAnimationFrame(() => {
      textarea.focus();
      textarea.setSelectionRange(nextCursorPosition, nextCursorPosition);
    });
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
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

    /*
     * Insert two spaces when Tab is pressed outside the language menu.
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
        <div className="mt-4 rounded-xl border border-border bg-card p-4">
          <p className="text-sm text-muted-foreground mb-2">Preview</p>
          <div
            className="prose prose-sm dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{
              __html: renderedHtml,
            }}
          />
        </div>

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

              {languageQuery && (
                <div className="mt-3 flex items-center gap-2 rounded-lg bg-muted/60 px-2.5 py-2">
                  <Search className="size-3.5 text-muted-foreground" />

                  <span className="truncate font-mono text-xs">
                    {languageQuery}
                  </span>
                </div>
              )}
            </div>

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
                        /*
                         * Prevent the textarea from losing focus before
                         * the language is inserted.
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
