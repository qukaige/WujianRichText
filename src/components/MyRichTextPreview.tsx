import { createElement, useState, useEffect } from "react";
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import { Editor, Toolbar } from '@wangeditor/editor-for-react'
import { IDomEditor, IEditorConfig, IToolbarConfig, i18nChangeLanguage } from '@wangeditor/editor'

export interface MyRichTextPreviewProps {
    richTextVal: string;
    lang: string;
    readOnly: boolean;
    height: number | null;
}

const MyRichTextPreview: React.FC<MyRichTextPreviewProps> = (props) => {
    const { lang, readOnly, height, richTextVal } = props;
    i18nChangeLanguage(lang === 'en' ? lang : 'zh-CN');
    const [editor, setEditor] = useState<IDomEditor | null>(null)   // TS 语法
    const [html, setHtml] = useState('')
    useEffect(() => {
        setHtml(richTextVal)
    }, [richTextVal])
    const toolbarConfig: Partial<IToolbarConfig> = {}  // TS 语法
    toolbarConfig.excludeKeys = [
        "uploadVideo",
        "uploadImage"
    ]
    const editorConfig: Partial<IEditorConfig> = {    // TS 语法
        placeholder: lang !== 'en' ? '请输入内容...' : 'Please enter content...',
        readOnly: readOnly
    }
    useEffect(() => {
        return () => {
            if (editor == null) return
            editor.destroy()
            setEditor(null)
        }
    }, [editor])
    return (
        <div>
            <div style={{ border: '1px solid #ccc', zIndex: 100 }}>
                <Toolbar
                    editor={editor}
                    defaultConfig={toolbarConfig}
                    mode="default"
                    style={{ borderBottom: '1px solid #ccc' }}
                />
                <Editor
                    defaultConfig={editorConfig}
                    value={html}
                    onCreated={setEditor}
                    mode="default"
                    style={{ height: ((height && height > 100) ? height : 500) + 'px', overflowY: 'hidden' }}
                />
            </div>
        </div>
    )
}

export default MyRichTextPreview;
