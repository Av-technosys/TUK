"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Heading from "@tiptap/extension-heading";
import Placeholder from "@tiptap/extension-placeholder";

export default function RichEditor({ value, onChange }: any) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false, // disable default
      }),
      Heading.configure({
        levels: [1, 2, 3],
      }),
      Placeholder.configure({
        placeholder: "Write something...",
      }),
    ],
    content: value,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) return null;

  return (
    <div className="border rounded-lg p-3 space-y-2">
      
      {/* 🔥 Toolbar */}
      <div className="flex flex-wrap gap-2 border-b pb-2">

        {/* Bold */}
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`px-2 py-1 border rounded ${
            editor.isActive("bold") ? "bg-blue-500 text-white" : ""
          }`}
        >
          B
        </button>

        {/* Italic */}
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`px-2 py-1 border rounded ${
            editor.isActive("italic") ? "bg-blue-500 text-white" : ""
          }`}
        >
          I
        </button>

        {/* Strike */}
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className="px-2 py-1 border rounded"
        >
          S
        </button>

        {/* Headings */}
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className="px-2 py-1 border rounded"
        >
          H1
        </button>

        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className="px-2 py-1 border rounded"
        >
          H2
        </button>

        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className="px-2 py-1 border rounded"
        >
          H3
        </button>

        {/* Lists */}
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className="px-2 py-1 border rounded"
        >
          • List
        </button>

        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className="px-2 py-1 border rounded"
        >
          1. List
        </button>

        {/* Blockquote */}
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className="px-2 py-1 border rounded"
        >
          ❝
        </button>

        {/* Code */}
        <button
          onClick={() => editor.chain().focus().toggleCode().run()}
          className="px-2 py-1 border rounded"
        >
          {"</>"}
        </button>

        {/* Undo / Redo */}
        <button
          onClick={() => editor.chain().focus().undo().run()}
          className="px-2 py-1 border rounded"
        >
          ↺
        </button>

        <button
          onClick={() => editor.chain().focus().redo().run()}
          className="px-2 py-1 border rounded"
        >
          ↻
        </button>
      </div>

      {/* 📝 Editor */}
      <EditorContent
        editor={editor}
        className="min-h-[200px] outline-none"
      />
    </div>
  );
}