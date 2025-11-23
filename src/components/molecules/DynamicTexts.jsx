import React from "react";
import Text from "../atoms/Text";

function DynamicTexts({ Texts = [] }) {
    return (
        <>
            
            {Texts.map((text, index) => (
                <Text key={text.id || index} variant={text.variant} className={text.className}>
                    {text.content}
                </Text> 
            ))}
        </>
    );
}
export default DynamicTexts;