import { Component, ReactNode, createElement } from "react";
import MyRichText from "./components/MyRichText";

import { WjRichTextContainerProps } from "../typings/WjRichTextProps";

import "./ui/WjRichText.css";

export class WjRichText extends Component<WjRichTextContainerProps> {
    render(): ReactNode {
        return <MyRichText 
        richTextVal={this.props.richTextVal}
        lang={this.props.lang}
        height={this.props.height}
        zIndex={this.props.zIndex}
        uploadImageSize={this.props.uploadImageSize}
        readOnly={this.props.readOnly}
         />;
    }
}
