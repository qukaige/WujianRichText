import { createElement, useState, useEffect, useRef } from "react";
import '@wangeditor/editor/dist/css/style.css'
import { Editor, Toolbar } from '@wangeditor/editor-for-react'
import { IDomEditor, IEditorConfig, IToolbarConfig, i18nChangeLanguage } from '@wangeditor/editor'
import { EditableValue } from "mendix";

export interface MyRichTextProps {
    richTextVal: EditableValue<string>;
    lang: string;
    readOnly: boolean;
    uploadImageSize: number;
    height: number;
}

const MyRichText: React.FC<MyRichTextProps> = (props) => {
    // 切换语言 - 'en' 或者 'zh-CN'
    i18nChangeLanguage(props.lang === 'en' ? props.lang : 'zh-CN');
    const propsRef = useRef(props);
    // editor 实例
    const [editor, setEditor] = useState<IDomEditor | null>(null)
    // 编辑器内容
    const [html, setHtml] = useState('')
    // 模拟 ajax 请求，异步设置 html
    useEffect(() => {
        setHtml(props?.richTextVal?.value || "")
        propsRef.current = props;
    }, [props])
    // 工具栏配置
    const toolbarConfig: Partial<IToolbarConfig> = {}
    // 过滤菜单
    toolbarConfig.excludeKeys = [
        "uploadVideo"
    ]
    // 编辑器配置
    const editorConfig: Partial<IEditorConfig> = {
        placeholder: props.lang !== 'en' ? '请输入内容...' : 'Please enter content...',
        readOnly: props.readOnly,
        MENU_CONF: {
            uploadImage: {
                // 小于该值就插入 base64 格式（而不上传），默认为 0
                base64LimitSize: props.uploadImageSize * 1024 // 5kb
            }
        }
    }
    // editorConfig.onFocus = (editor: IDomEditor) => {
    //     // editor focused
    //     console.log(1)
    // }
    // editorConfig.onBlur = (editor: IDomEditor) => {  
    //     // editor blur
    //     console.log(2)
    // }
    editorConfig.onChange = (editor: IDomEditor) => {
        const currentProps = propsRef.current;
        currentProps.richTextVal?.status === "available" && currentProps.richTextVal.setValue(editor.getHtml())
    }
    // 及时销毁 editor ，重要！
    useEffect(() => {
        return () => {
            if (editor == null) return
            editor.destroy()
            setEditor(null)
        }
    }, [editor])
    // const toolbar = DomEditor.getToolbar(editor as IDomEditor)
    // const curToolbarConfig = toolbar?.getConfig()
    // console.log('tollbarkeys=', curToolbarConfig?.toolbarKeys) // 当前菜单排序和分组
    // console.log('editor.getAllMenuKeys()=', editor?.getAllMenuKeys())
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
                    style={{ height: ((props.height && props.height > 100) ? props.height : 500) + 'px', overflowY: 'hidden' }}
                />
            </div>
        </div>
    )
}

export default MyRichText;
