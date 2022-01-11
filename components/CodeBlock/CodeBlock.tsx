import React from "react";

interface CodeBlockProps {
    character: string;
    status: "C" | "I" | "U" | "R";
    index: number
}
export default function CodeBlock(props: CodeBlockProps) {
    return (
        <>
            {
                
            }
        </>
    )

}


//      else if (codeBlock.character === " ") {
//     return <span key={index} className={`subtitle is-5 ${codeBlock.status == "C" ? "has-background-success has-text-light" : codeBlock.status == "I" ? "has-background-danger has-text-light" : codeBlock.status == "R" ? "current has-background-warning has-text-white" : "has-background-white has-text-black"}`}>&nbsp;&nbsp;&nbsp;</span>
// } else if (codeBlock.character === "\t") {
//     return <span key={index} className={`subtitle is-5 ${codeBlock.status == "C" ? "has-background-success has-text-light" : codeBlock.status == "I" ? "has-background-danger has-text-light" : codeBlock.status == "R" ? "current has-background-warning has-text-white" : "has-background-white has-text-black"}`}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
// } else {
//     return <span key={index} className={`subtitle is-5 ${codeBlock.status == "C" ? "has-background-success has-text-light" : codeBlock.status == "I" ? "has-background-danger has-text-light" : codeBlock.status == "R" ? "current has-background-warning has-text-white" : "has-background-white has-text-black"}`}>{codeBlock.character}</span>

// }