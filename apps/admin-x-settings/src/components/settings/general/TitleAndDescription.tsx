import React from "react";
import TopLevelGroup from "../../TopLevelGroup";
import useSettingGroup from "../../../hooks/useSettingGroup";
import {
    SettingGroupContent,
    TextField,
    withErrorBoundary,
} from "@tryghost/admin-x-design-system";
import { getSettingValues } from "@tryghost/admin-x-framework/api/settings";

const TitleAndDescription: React.FC<{ keywords: string[] }> = ({
    keywords,
}) => {
    const {
        localSettings,
        isEditing,
        saveState,
        focusRef,
        handleSave,
        handleCancel,
        updateSetting,
        handleEditingChange,
    } = useSettingGroup();

    const [title, description] = getSettingValues(localSettings, [
        "title",
        "description",
    ]) as string[];

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        updateSetting("title", e.target.value);
    };

    const handleDescriptionChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        updateSetting("description", e.target.value);
    };

    const values = (
        <SettingGroupContent
            columns={2}
            values={[
                {
                    heading: "Tiêu đề trang web",
                    key: "site-title",
                    value: title,
                },
                {
                    heading: "Mô tả trang web",
                    key: "site-description",
                    value: description,
                },
            ]}
        />
    );

    const inputFields = (
        <SettingGroupContent>
            <TextField
                hint="Tiêu đề trang web của bạn, hiển thị ở đầu trang web và trong kết quả tìm kiếm"
                inputRef={focusRef}
                placeholder="Site title"
                title="Tiêu đề trang web"
                value={title}
                onChange={handleTitleChange}
            />
            <TextField
                hint="Mô tả trang web của bạn, hiển thị trong kết quả tìm kiếm"
                placeholder="Site description"
                title="Mô tả trang web"
                value={description}
                onChange={handleDescriptionChange}
            />
        </SettingGroupContent>
    );

    return (
        <TopLevelGroup
            description="Thông tin cơ bản về trang web của bạn, bao gồm tiêu đề và mô tả."
            isEditing={isEditing}
            keywords={keywords}
            navid="general"
            saveState={saveState}
            testId="title-and-description"
            title="Tiêu đề & mô tả"
            onCancel={handleCancel}
            onEditingChange={handleEditingChange}
            onSave={handleSave}
        >
            {isEditing ? inputFields : values}
        </TopLevelGroup>
    );
};

export default withErrorBoundary(TitleAndDescription, "Tiêu đề & mô tả");
