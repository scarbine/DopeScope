import React from "react";
import { useEffect, useState } from "react/cjs/react.development";
import { getAllTags, getTagById, updateTag } from "../../modules/TagManager";
import { Image, Transformation } from "cloudinary-react";

export const EditTagOptions = () => {
  const [tags, setTags] = useState([]);
  const [tagToEdit, setTagToEdit] = useState(undefined);

  const handleTagClick = (e) => {
    console.log(e.target.id);
    getTagById(e.target.id).then((tag) => {
      setTagToEdit(tag);
    });
  };

  useEffect(() => {
    getAllTags().then(setTags);
  }, []);

  useEffect(() => {
    console.log(tagToEdit);
  }, [tagToEdit]);

  const handleInputControlChange = (e) => {
    const newTag = { ...tagToEdit };
    newTag[e.target.name] = e.target.value;
    setTagToEdit(newTag);
    console.log(tagToEdit);
  };

  const handleSubmit = () => {
    updateTag(tagToEdit);
    setTagToEdit(undefined);
  };
  const handleCancel = () => {
    setTagToEdit(undefined);
  };

  return (
    <>
      <div className="edit-tag-view">
        <div className="logo-edit-tag">
          <Image
            className="dope-scope-logo-mini"
            cloudName="ddaeunjfu"
            publicId="sldw7e2sdswxiiwnqxng.png"
            secure="true"
          >
            <Transformation width="275" height="170" crop="fill" />
          </Image>
        </div>
        <h1>Which tag would you like to edit?</h1>
        <div className="tag-options-container">
          {tags?.map((tag) => {
            return (
              <>
                <div
                  className="search-tag-container"
                  onClick={handleTagClick}
                  key={tag.id}
                  id={tag.id}
                  value={tag}
                >
                  {tag.tagName}
                </div>
              </>
            );
          })}
        </div>
        <div className="edit-tag-field">
          {tagToEdit !== undefined ? (
            <>
              <div>
                <input
                  onChange={handleInputControlChange}
                  type="text"
                  name="tagName"
                  value={tagToEdit?.tagName}
                ></input>
                <div className="edit-tag-action-btns">
                  <div className="edit-tag-action-btn" onClick={handleSubmit}>
                    Submit
                  </div>
                  <div className="edit-tag-action-btn" onClick={handleCancel}>
                    Cancel
                  </div>
                </div>
              </div>{" "}
            </>
          ) : (
            <> </>
          )}
        </div>
      </div>
    </>
  );
};
