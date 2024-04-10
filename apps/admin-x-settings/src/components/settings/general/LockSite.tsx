import React from "react";
import TopLevelGroup from "../../TopLevelGroup";
import useSettingGroup from "../../../hooks/useSettingGroup";
import {
    Hint,
    Icon,
    Separator,
    SettingGroupContent,
    TextField,
    Toggle,
    withErrorBoundary,
} from "@tryghost/admin-x-design-system";
import { getSettingValues } from "@tryghost/admin-x-framework/api/settings";
import { useGlobalData } from "../../providers/GlobalDataProvider";

const LockSite: React.FC<{ keywords: string[] }> = ({ keywords }) => {
    const { siteData } = useGlobalData();
    const {
        localSettings,
        isEditing,
        saveState,
        handleSave,
        handleCancel,
        updateSetting,
        handleEditingChange,
        errors,
        clearError,
    } = useSettingGroup({
        onValidate: () => {
            if (passwordEnabled && !password) {
                return {
                    password: "Yêu cầu nhập mật khẩu",
                };
            }

            return {};
        },
    });

    const [passwordEnabled, password, publicHash] = getSettingValues(
        localSettings,
        ["is_private", "password", "public_hash"]
    ) as [boolean, string, string];

    const handleToggleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        updateSetting("is_private", e.target.checked);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        updateSetting("password", e.target.value);
    };

    const privateRssUrl = `${siteData.url.replace(
        /\/$/,
        ""
    )}/${publicHash}/rss`;
    const hint = (
        <>
            RSS feed riêng tư có thể được tìm thấy ở đây{" "}
            <a
                className="break-all text-green"
                href={privateRssUrl}
                rel="noopener noreferrer"
                target="_blank"
            >
                {privateRssUrl}
            </a>
        </>
    );

    const values = (
        <SettingGroupContent
            values={[
                {
                    key: "private",
                    value: passwordEnabled ? (
                        <div className="w-full">
                            <div className="flex items-center gap-1">
                                {/* <div className='rounded-full border border-yellow p-2'> */}
                                <Icon
                                    colorClass="text-yellow"
                                    name="lock-locked"
                                    size="sm"
                                />
                                {/* </div> */}
                                <div className="leading-supertight">
                                    Trang của bạn đã được đặt mật khẩu
                                </div>
                            </div>
                            {hint && (
                                <div className="mt-7 w-full">
                                    <Separator />
                                    <Hint>{hint}</Hint>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="flex items-center gap-1 text-grey-900 dark:text-grey-400">
                            <Icon
                                colorClass="text-black dark:text-white"
                                name="lock-unlocked"
                                size="sm"
                            />
                            <span>
                                Trang web của bạn đang không có mật khẩu
                            </span>
                        </div>
                    ),
                },
            ]}
        />
    );

    const inputs = (
        <SettingGroupContent>
            <Toggle
                checked={passwordEnabled}
                direction="rtl"
                hint="Toàn bộ SEO và mạng xã hội sẽ không còn được tìm thấy nữa"
                label="Thêm mật khẩu để ẩn trang web của bạn"
                onChange={handleToggleChange}
            />
            {passwordEnabled && (
                <TextField
                    error={!!errors.password}
                    hint={errors.password}
                    placeholder="Enter password"
                    title="Mật khẩu truy cập trang web"
                    value={password}
                    hideTitle
                    onChange={handlePasswordChange}
                    onKeyDown={() => clearError("password")}
                />
            )}
        </SettingGroupContent>
    );

    return (
        <TopLevelGroup
            description="Thêm mật khẩu để ẩn trang web của bạn khỏi công cộng"
            isEditing={isEditing}
            keywords={keywords}
            navid="locksite"
            saveState={saveState}
            testId="locksite"
            title="Ẩn trang (private)"
            onCancel={handleCancel}
            onEditingChange={handleEditingChange}
            onSave={handleSave}
        >
            {isEditing ? inputs : values}
        </TopLevelGroup>
    );
};

export default withErrorBoundary(LockSite, "Ẩn trang");
