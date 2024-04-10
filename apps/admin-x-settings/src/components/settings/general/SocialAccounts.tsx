import React, { useState } from "react";
import TopLevelGroup from "../../TopLevelGroup";
import useSettingGroup from "../../../hooks/useSettingGroup";
import {
    SettingGroupContent,
    TextField,
    withErrorBoundary,
} from "@tryghost/admin-x-design-system";
import {
    facebookHandleToUrl,
    facebookUrlToHandle,
    twitterHandleToUrl,
    twitterUrlToHandle,
    validateFacebookUrl,
    validateTwitterUrl,
} from "../../../utils/socialUrls";
import { getSettingValues } from "@tryghost/admin-x-framework/api/settings";

const SocialAccounts: React.FC<{ keywords: string[] }> = ({ keywords }) => {
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

    const [errors, setErrors] = useState<{
        facebook?: string;
        twitter?: string;
    }>({});

    const [facebookHandle, twitterHandle] = getSettingValues<string | null>(
        localSettings,
        ["facebook", "twitter"]
    );

    const [facebookUrl, setFacebookUrl] = useState(
        facebookHandle ? facebookHandleToUrl(facebookHandle) : ""
    );
    const [twitterUrl, setTwitterUrl] = useState(
        twitterHandle ? twitterHandleToUrl(twitterHandle) : ""
    );

    const values = (
        <SettingGroupContent
            values={[
                {
                    heading: `Địa chỉ URL của trang Facebook của bạn`,
                    key: "facebook",
                    value: facebookUrl,
                    hideEmptyValue: true,
                },
                {
                    heading: "Địa chỉ URL của trang Twitter của bạn",
                    key: "twitter",
                    value: twitterUrl,
                    hideEmptyValue: true,
                },
            ]}
        />
    );

    const inputs = (
        <SettingGroupContent>
            <TextField
                error={!!errors.facebook}
                hint={errors.facebook}
                inputRef={focusRef}
                placeholder="https://www.facebook.com/ghost"
                title={`Địa chỉ URL của trang Facebook của bạn`}
                value={facebookUrl}
                onBlur={(e) => {
                    try {
                        const newUrl = validateFacebookUrl(e.target.value);
                        updateSetting("facebook", facebookUrlToHandle(newUrl));
                        setFacebookUrl(newUrl);
                    } catch (err) {
                        if (err instanceof Error) {
                            setErrors({ ...errors, facebook: err.message });
                        }
                    }
                }}
                onChange={(e) => setFacebookUrl(e.target.value)}
                onKeyDown={() => {
                    if (errors.facebook) {
                        setErrors({ ...errors, facebook: "" });
                    }
                }}
            />
            <TextField
                error={!!errors.twitter}
                hint={errors.twitter}
                placeholder="https://twitter.com/ghost"
                title="Địa chỉ URL của trang Twitter của bạn"
                value={twitterUrl}
                onBlur={(e) => {
                    try {
                        const newUrl = validateTwitterUrl(e.target.value);
                        updateSetting("twitter", twitterUrlToHandle(newUrl));
                        setTwitterUrl(newUrl);
                    } catch (err) {
                        if (err instanceof Error) {
                            setErrors({ ...errors, twitter: err.message });
                        }
                    }
                }}
                onChange={(e) => setTwitterUrl(e.target.value)}
                onKeyDown={() => {
                    if (errors.twitter) {
                        setErrors({ ...errors, twitter: "" });
                    }
                }}
            />
        </SettingGroupContent>
    );

    return (
        <TopLevelGroup
            description="Liên kết tài khoản xã hội của bạn với trang web của bạn"
            isEditing={isEditing}
            keywords={keywords}
            navid="social-accounts"
            saveState={saveState}
            testId="social-accounts"
            title="Tài khoản mạng xã hội"
            onCancel={handleCancel}
            onEditingChange={handleEditingChange}
            onSave={() => {
                const formErrors: {
                    facebook?: string;
                    twitter?: string;
                } = {};
                try {
                    validateFacebookUrl(facebookUrl);
                } catch (e) {
                    if (e instanceof Error) {
                        formErrors.facebook = e.message;
                    }
                }

                try {
                    validateTwitterUrl(twitterUrl);
                } catch (e) {
                    if (e instanceof Error) {
                        formErrors.twitter = e.message;
                    }
                }

                setErrors(formErrors);
                if (Object.keys(formErrors).length === 0) {
                    handleSave();
                }
            }}
        >
            {isEditing ? inputs : values}
        </TopLevelGroup>
    );
};

export default withErrorBoundary(SocialAccounts, "Tài khoản mạng xã hội");
