import React, { useEffect, useMemo, useRef, useState } from "react";
import { Check, Code2, Search, Image } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FormControl } from "@/components/ui/form";
import { supportedLanguages } from "@/lib/mock-data";
import { Textarea } from "@/components/ui/textarea";
import { useFileUpload } from "@/hooks/usefile-upload";

type Language = (typeof supportedLanguages)[number];

export function MarkdownCommentField({
  field,
  placeholder,
}: {
  field: {
    value?: string;
    onChange: (value: string) => void;
    onBlur?: React.FocusEventHandler<HTMLTextAreaElement>;
    name?: string;
    ref?: React.Ref<HTMLTextAreaElement>;
  };
  placeholder?: string;
}) {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  /*
   * Stores the position where the latest opening code fence begins.
   * For example, the index of the first backtick in ```typescript.
   */
  const fenceStartRef = useRef<number | null>(null);

  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [languageQuery, setLanguageQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  const { handleFileSelect, handlePaste } = useFileUpload(textareaRef, field);

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
    <>
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
            placeholder={placeholder ?? "Write a reply..."}
            className="
            min-h-[120px]
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
    </>
  );
}
