import { Component, ReactNode, createElement } from "react";
import { WjRichTextPreviewProps } from "../typings/WjRichTextProps";
import MyRichTextTwoPreview from "./components/MyRichTextPreview";

export class preview extends Component<WjRichTextPreviewProps> {
    render(): ReactNode {
        return <MyRichTextTwoPreview 
        richTextVal={this.props.richTextVal}
        lang={this.props.lang}
        height={this.props.height}
        readOnly={this.props.readOnly}
         />;
    }
}

export function getPreviewCss(): string {
    return require("./ui/WjRichText.css");
}
