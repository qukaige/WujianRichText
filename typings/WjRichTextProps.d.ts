/**
 * This file was generated from WjRichText.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Framework Team
 */
import { CSSProperties } from "react";
import { EditableValue } from "mendix";

export type LangEnum = "cn" | "en";

export interface WjRichTextContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    richTextVal: EditableValue<string>;
    lang: LangEnum;
    readOnly: boolean;
    height: number;
    uploadImageSize: number;
}

export interface WjRichTextPreviewProps {
    /**
     * @deprecated Deprecated since version 9.18.0. Please use class property instead.
     */
    className: string;
    class: string;
    style: string;
    styleObject?: CSSProperties;
    readOnly: boolean;
    renderMode?: "design" | "xray" | "structure";
    richTextVal: string;
    lang: LangEnum;
    readOnly: boolean;
    height: number | null;
    uploadImageSize: number | null;
}
