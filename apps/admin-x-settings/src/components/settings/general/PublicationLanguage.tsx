import React from "react";
import TopLevelGroup from "../../TopLevelGroup";
import useSettingGroup from "../../../hooks/useSettingGroup";
import {
    SettingGroupContent,
    TextField,
    withErrorBoundary,
} from "@tryghost/admin-x-design-system";
import { getSettingValues } from "@tryghost/admin-x-framework/api/settings";

const PublicationLanguage: React.FC<{ keywords: string[] }> = ({
    keywords,
}) => {
    const {
        localSettings,
        isEditing,
        saveState,
        handleSave,
        handleCancel,
        updateSetting,
        focusRef,
        handleEditingChange,
    } = useSettingGroup();

    const [publicationLanguage] = getSettingValues(localSettings, [
        "locale",
    ]) as string[];

    const handleLanguageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        updateSetting("locale", e.target.value);
    };

    const values = (
        <SettingGroupContent
            values={[
                {
                    heading: "Ngôn ngữ trang web",
                    key: "site-language",
                    value: publicationLanguage,
                },
            ]}
        />
    );

    const hint = (
        <>
            Mặc định: English (<strong>en</strong>);
        </>
    );

    const inputFields = (
        <SettingGroupContent columns={1}>
            <TextField
                hint={hint}
                inputRef={focusRef}
                placeholder="Site language"
                title="Ngôn ngữ trang web"
                value={publicationLanguage}
                onChange={handleLanguageChange}
            />
        </SettingGroupContent>
    );

    return (
        <TopLevelGroup
            description="Cài đặt ngôn ngữ trang web của bạn"
            isEditing={isEditing}
            keywords={keywords}
            navid="publication-language"
            saveState={saveState}
            testId="publication-language"
            title="Ngôn ngữ xuất bản"
            onCancel={handleCancel}
            onEditingChange={handleEditingChange}
            onSave={handleSave}
        >
            {isEditing ? inputFields : values}
        </TopLevelGroup>
    );
};

export default withErrorBoundary(PublicationLanguage, "Ngôn ngữ xuất bản");
