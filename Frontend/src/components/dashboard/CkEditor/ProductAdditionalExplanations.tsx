import React, { useEffect, useState } from "react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { Editor } from "@ckeditor/ckeditor5-core";
import "ckeditor5/ckeditor5.css";
import { Product } from "../../../types";
import { EventInfo } from "ckeditor5";
interface ProductAdditionalExplanationsProps {
  setSelectedProduct: React.Dispatch<React.SetStateAction<Product>>;
  SelectedProduct: Product;
}
const ProductAdditionalExplanations: React.FC<
  ProductAdditionalExplanationsProps
> = ({ SelectedProduct, setSelectedProduct }) => {
  const [editorData, setEditorData] = useState("");
  useEffect(() => {
    setEditorData(
      (SelectedProduct.additionalExplanations &&
        SelectedProduct.additionalExplanations) ||
        ""
    );
  }, [SelectedProduct.additionalExplanations]);
  const handleCkeditorState = (
    e: EventInfo<string, unknown>,
    editor: Editor
  ) => {
    const data = editor.getData();
    console.log(e);
    setSelectedProduct((prev) => ({
      ...prev,
      additionalExplanations: data,
    }));
  };
  return (
    <div className="">
      <CKEditor
        editor={ClassicEditor}
        data={editorData}
        onReady={(editor) => {
          console.log("Editor 2 is ready to use!", editor);
        }}
        onError={(error) => {
          alert("Error uploading image: " + error);
          console.log(error);
        }}
        config={{
          ckfinder: {
            //! change
            // uploadUrl: "http://localhost:5000/api/upload",
            // uploadUrl: "https://abtin-kerman-backend-new.vercel.app/api/upload",
            uploadUrl: "https://api.kermanatari.ir/api/upload",
          },
        }}
        onChange={handleCkeditorState}
      />
    </div>
  );
};

export default ProductAdditionalExplanations;
