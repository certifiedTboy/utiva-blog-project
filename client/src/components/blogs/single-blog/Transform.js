import SyntaxHighlighter from "react-syntax-highlighter";
import { vs2015 } from "react-syntax-highlighter/dist/esm/styles/hljs";

export const transform = (node, children) => {
  if (node.tagName === "PRE") {
    if (children[0].props) {
      const properties = children[0].props.children;
      const newChildren = properties.filter(
        (child) => typeof child === "string"
      );
      const concatedChild = newChildren.join("\n");

      return (
        <SyntaxHighlighter
          language="javascript"
          style={vs2015}
          showLineNumbers
          showInlineLinenNumbers
          wrapLines>
          {concatedChild}
        </SyntaxHighlighter>
      );
    }
  }
};
