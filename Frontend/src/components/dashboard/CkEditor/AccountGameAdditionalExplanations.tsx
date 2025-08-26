import React, { useEffect, useState } from "react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { Editor } from "@ckeditor/ckeditor5-core";
import { EventInfo } from "ckeditor5";
import "ckeditor5/ckeditor5.css";
import { GameData } from "../../../types";
interface AccountGameAdditionalExplanationsProps {
  setGameData: React.Dispatch<React.SetStateAction<GameData>>;
  GameData: GameData;
}
const AccountGameAdditionalExplanations: React.FC<
  AccountGameAdditionalExplanationsProps
> = ({ setGameData, GameData }) => {
  const [editorData, setEditorData] = useState("");
  useEffect(() => {
    setEditorData(
      (GameData.additionalExplanations && GameData.additionalExplanations) || ""
    );
  }, [GameData.additionalExplanations]);
  const handleCkeditorState = (
    e: EventInfo<string, unknown>,
    editor: Editor
  ) => {
    console.log(e);
    const data = editor.getData();
    setGameData((prev) => ({
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

export default AccountGameAdditionalExplanations;
