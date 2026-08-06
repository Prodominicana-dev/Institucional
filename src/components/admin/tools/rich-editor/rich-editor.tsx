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
import { IconTable } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

export default function TextEditor({
  editor,
  description,
  number,
}: {
  editor: any;
  description?: any;
  number?: number;
}) {
  useEffect(() => {
    if (description !== "" && description !== undefined && description !== null)
      editor?.commands.setContent(description);
  }, [description]);
  return (
    <RichTextEditor
      editor={editor}
      variant="subtle"
      className={cn("news-editor", number && "news-editor--compact")}
    >
      <RichTextEditor.Toolbar className="rte-toolbar">
        <div className="rte-group-wrap">
          <span className="rte-group-label">Fuente</span>
          <RichTextEditor.ControlsGroup className="rte-group">
            <RichTextEditor.Bold />
            <RichTextEditor.Italic />
            <RichTextEditor.Underline />
            <RichTextEditor.Strikethrough />
            <RichTextEditor.ClearFormatting />
            <RichTextEditor.Highlight />
          </RichTextEditor.ControlsGroup>
        </div>

        <div className="rte-group-wrap">
          <span className="rte-group-label">Títulos</span>
          <RichTextEditor.ControlsGroup className="rte-group">
            <RichTextEditor.H1 />
            <RichTextEditor.H2 />
            <RichTextEditor.H3 />
            <RichTextEditor.H4 />
          </RichTextEditor.ControlsGroup>
        </div>

        <div className="rte-group-wrap">
          <span className="rte-group-label">Párrafo</span>
          <RichTextEditor.ControlsGroup className="rte-group">
            <RichTextEditor.Blockquote />
            <RichTextEditor.Hr />
            <RichTextEditor.BulletList />
            <RichTextEditor.OrderedList />
          </RichTextEditor.ControlsGroup>
        </div>

        <div className="rte-group-wrap">
          <span className="rte-group-label">Enlace</span>
          <RichTextEditor.ControlsGroup className="rte-group">
            <RichTextEditor.Link />
            <RichTextEditor.Unlink />
          </RichTextEditor.ControlsGroup>
        </div>

        <div className="rte-group-wrap">
          <span className="rte-group-label">Alinear</span>
          <RichTextEditor.ControlsGroup className="rte-group">
            <RichTextEditor.AlignLeft />
            <RichTextEditor.AlignCenter />
            <RichTextEditor.AlignRight />
          </RichTextEditor.ControlsGroup>
        </div>

        <div className="rte-group-wrap rte-group-wrap--last">
          <span className="rte-group-label">Tabla</span>
          <RichTextEditor.ControlsGroup className="rte-group">
            <Menu placement="right-start">
              <MenuHandler>
                <button className="flex h-[2.125rem] w-[2.125rem] items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-background hover:text-foreground hover:shadow-sm">
                  <IconTable size={16} stroke={1.5} />
                </button>
              </MenuHandler>
            <MenuList className="z-[9999]">
              <MenuItem
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
                onClick={() => editor?.chain().focus().addColumnBefore().run()}
              >
                Añadir columna antes
              </MenuItem>
              <MenuItem
                onClick={() => editor?.chain().focus().addColumnAfter().run()}
              >
                Añadir columna despues
              </MenuItem>
              <MenuItem
                onClick={() => editor?.chain().focus().addRowBefore().run()}
              >
                Añadir fila antes
              </MenuItem>
              <MenuItem
                onClick={() => editor?.chain().focus().addRowAfter().run()}
              >
                Añadir fila despues
              </MenuItem>
              <hr className="my-2" />
              <MenuItem
                onClick={() => editor?.chain().focus().deleteColumn().run()}
              >
                Borrar columna
              </MenuItem>
              <MenuItem
                onClick={() => editor?.chain().focus().deleteRow().run()}
              >
                Borrar fila
              </MenuItem>
              <MenuItem
                onClick={() => editor?.chain().focus().deleteTable().run()}
              >
                Borrar tabla
              </MenuItem>
            </MenuList>
            </Menu>
          </RichTextEditor.ControlsGroup>
        </div>
      </RichTextEditor.Toolbar>
      <RichTextEditor.Content className="w-full overflow-y-auto no-scrollbar" />
    </RichTextEditor>
  );
}
