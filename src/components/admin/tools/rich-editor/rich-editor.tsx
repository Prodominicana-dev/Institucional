"use client";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import { RichTextEditor } from "@mantine/tiptap";
import React, { useEffect } from "react";
import Image from "next/image";

export default function TextEditor({
  editor,
  description,
  number = 20,
}: {
  editor: any;
  description?: any;
  number?: number;
}) {
  useEffect(() => {
    if (description !== "" && description !== undefined && description !== null)
      editor.commands.setContent(description);
  }, [description]);
  return (
    <RichTextEditor editor={editor}>
      <RichTextEditor.Toolbar>
        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Bold />
          <RichTextEditor.Italic />
          <RichTextEditor.Underline />
          <RichTextEditor.Strikethrough />
          <RichTextEditor.ClearFormatting />
          <RichTextEditor.Highlight />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.H1 />
          <RichTextEditor.H2 />
          <RichTextEditor.H3 />
          <RichTextEditor.H4 />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Blockquote />
          <RichTextEditor.Hr />
          <RichTextEditor.BulletList />
          <RichTextEditor.OrderedList />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Link />
          <RichTextEditor.Unlink />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.AlignLeft />
          <RichTextEditor.AlignCenter />
          <RichTextEditor.AlignRight />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <Menu placement="right-start">
            <MenuHandler>
              <button className="container p-1 h-[1.625rem] w-[1.625rem] bg-white ring-1 ring-gray-300 rounded-md">
                <Image
                  width="50"
                  height="50"
                  src="https://img.icons8.com/ios/50/table-1.png"
                  alt="table-1"
                />
              </button>
            </MenuHandler>
            <MenuList placeholder={undefined} className="z-[9999]">
              <MenuItem
                placeholder={undefined}
                onClick={() =>
                  editor
                    ?.chain()
                    .focus()
                    .insertTable({
                      rows: 3,
                      cols: 3,
                      withHeaderRow: true,
                    })
                    .run()
                }
              >
                Añadir tabla
              </MenuItem>
              <hr className="my-2" />
              <MenuItem
                placeholder={undefined}
                onClick={() => editor?.chain().focus().addColumnBefore().run()}
              >
                Añadir columna antes
              </MenuItem>
              <MenuItem
                placeholder={undefined}
                onClick={() => editor?.chain().focus().addColumnAfter().run()}
              >
                Añadir columna despues
              </MenuItem>
              <MenuItem
                placeholder={undefined}
                onClick={() => editor?.chain().focus().addRowBefore().run()}
              >
                Añadir fila antes
              </MenuItem>
              <MenuItem
                placeholder={undefined}
                onClick={() => editor?.chain().focus().addRowAfter().run()}
              >
                Añadir fila despues
              </MenuItem>
              <hr className="my-2" />
              <MenuItem
                placeholder={undefined}
                onClick={() => editor?.chain().focus().deleteColumn().run()}
              >
                Borrar columna
              </MenuItem>
              <MenuItem
                placeholder={undefined}
                onClick={() => editor?.chain().focus().deleteRow().run()}
              >
                Borrar fila
              </MenuItem>
              <MenuItem
                placeholder={undefined}
                onClick={() => editor?.chain().focus().deleteTable().run()}
              >
                Borrar tabla
              </MenuItem>
            </MenuList>
          </Menu>
        </RichTextEditor.ControlsGroup>
      </RichTextEditor.Toolbar>
      <RichTextEditor.Content
        className={`h-[${number}vh] w-full overflow-y-auto no-scrollbar`}
      />
    </RichTextEditor>
  );
}
