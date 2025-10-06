import { Button, ButtonGroup, Dropdown, ButtonToolbar } from "react-bootstrap";
import type { Editor } from "@tiptap/react";

interface Props {
  editor: Editor | null;
  onPickImage?: () => void;
}

export default function EditorToolbar({ editor, onPickImage }: Props) {
  if (!editor) return <ButtonToolbar className="mb-2" />;

  const isActive = (name: string, attrs?: any) => editor.isActive(name as any, attrs);

  const setHeading = (level: 1 | 2 | 3 | 4 | 5 | 6) => editor.chain().focus().toggleHeading({ level }).run();

  const toggleLink = () => {
    const prev = editor.getAttributes("link").href as string | undefined;
    const url = window.prompt("Enter URL", prev || "https://");
    if (url === null) return;
    if (url === "" || url === "https://") {
      editor.chain().focus().unsetLink().run();
      return;
    }
    editor.chain().focus().setLink({ href: url, target: "_blank", rel: "noopener nofollow" }).run();
  };

  return (
    <ButtonToolbar className="mb-2">
      <ButtonGroup className="me-2">
        <Button variant={isActive("bold") ? "primary" : "outline-secondary"} onClick={() => editor.chain().focus().toggleBold().run()}>B</Button>
        <Button variant={isActive("italic") ? "primary" : "outline-secondary"} onClick={() => editor.chain().focus().toggleItalic().run()}><em>I</em></Button>
        <Button variant={isActive("underline") ? "primary" : "outline-secondary"} onClick={() => editor.chain().focus().toggleUnderline().run()}><span style={{ textDecoration: 'underline' }}>U</span></Button>
        <Button variant={isActive("strike") ? "primary" : "outline-secondary"} onClick={() => editor.chain().focus().toggleStrike().run()}><s>S</s></Button>
        <Button variant={isActive("highlight") ? "primary" : "outline-secondary"} onClick={() => editor.chain().focus().toggleHighlight().run()}>Highlight</Button>
      </ButtonGroup>

      <ButtonGroup className="me-2">
        <Dropdown as={ButtonGroup}>
          <Button variant={editor.isActive("paragraph") ? "primary" : "outline-secondary"} onClick={() => editor.chain().focus().setParagraph().run()}>P</Button>
          <Dropdown.Toggle split variant="outline-secondary" id="heading-dropdown" />
          <Dropdown.Menu>
            {[1,2,3].map((lvl) => (
              <Dropdown.Item key={lvl} active={isActive('heading', { level: lvl })} onClick={() => setHeading(lvl as 1|2|3)}>H{lvl}</Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </ButtonGroup>

      <ButtonGroup className="me-2">
        <Button variant={isActive("bulletList") ? "primary" : "outline-secondary"} onClick={() => editor.chain().focus().toggleBulletList().run()}>• List</Button>
        <Button variant={isActive("orderedList") ? "primary" : "outline-secondary"} onClick={() => editor.chain().focus().toggleOrderedList().run()}>1. List</Button>
        <Button variant={isActive("blockquote") ? "primary" : "outline-secondary"} onClick={() => editor.chain().focus().toggleBlockquote().run()}>Quote</Button>
        <Button variant={isActive("codeBlock") ? "primary" : "outline-secondary"} onClick={() => editor.chain().focus().toggleCodeBlock().run()}>Code</Button>
        <Button variant="outline-secondary" onClick={() => editor.chain().focus().setHorizontalRule().run()}>HR</Button>
      </ButtonGroup>

      <ButtonGroup className="me-2">
        <Button variant={isActive({ textAlign: 'left' } as any) ? "primary" : "outline-secondary"} onClick={() => editor.chain().focus().setTextAlign('left').run()}>Left</Button>
        <Button variant={isActive({ textAlign: 'center' } as any) ? "primary" : "outline-secondary"} onClick={() => editor.chain().focus().setTextAlign('center').run()}>Center</Button>
        <Button variant={isActive({ textAlign: 'right' } as any) ? "primary" : "outline-secondary"} onClick={() => editor.chain().focus().setTextAlign('right').run()}>Right</Button>
        <Button variant={isActive({ textAlign: 'justify' } as any) ? "primary" : "outline-secondary"} onClick={() => editor.chain().focus().setTextAlign('justify').run()}>Justify</Button>
      </ButtonGroup>

      <ButtonGroup className="me-2">
        <Button variant={isActive("link") ? "primary" : "outline-secondary"} onClick={toggleLink}>Link</Button>
        <Button variant="outline-secondary" onClick={() => editor.chain().focus().unsetLink().run()}>Unlink</Button>
        <Button variant="outline-secondary" onClick={() => onPickImage && onPickImage()}>Image</Button>
      </ButtonGroup>

      <ButtonGroup>
        <Button variant="outline-secondary" onClick={() => editor.chain().focus().undo().run()}>Undo</Button>
        <Button variant="outline-secondary" onClick={() => editor.chain().focus().redo().run()}>Redo</Button>
      </ButtonGroup>
    </ButtonToolbar>
  );
}
