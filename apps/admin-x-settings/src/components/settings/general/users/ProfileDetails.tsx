import CustomHeader from "./CustomHeader";
import {
    SettingGroup,
    SettingGroupContent,
    TextArea,
    TextField,
} from "@tryghost/admin-x-design-system";
import { UserDetailProps } from "../UserDetailModal";
import {
    facebookHandleToUrl,
    facebookUrlToHandle,
    twitterHandleToUrl,
    twitterUrlToHandle,
    validateFacebookUrl,
    validateTwitterUrl,
} from "../../../../utils/socialUrls";
import { useState } from "react";

export const DetailsInputs: React.FC<UserDetailProps> = ({
    errors,
    clearError,
    validateField,
    user,
    setUserData,
}) => {
    const [facebookUrl, setFacebookUrl] = useState(
        user.facebook ? facebookHandleToUrl(user.facebook) : ""
    );
    const [twitterUrl, setTwitterUrl] = useState(
        user.twitter ? twitterHandleToUrl(user.twitter) : ""
    );

    return (
        <SettingGroupContent>
            <TextField
                error={!!errors?.location}
                hint={errors?.location || "Bạn sống ở đâu?"}
                title="Địa chỉ"
                value={user.location || ""}
                onBlur={(e) => {
                    validateField("location", e.target.value);
                }}
                onChange={(e) => {
                    setUserData({ ...user, location: e.target.value });
                }}
                onKeyDown={() => clearError("location")}
            />
            <TextField
                error={!!errors?.url}
                hint={errors?.url || "Website cá nhân"}
                title="Website"
                value={user.website || ""}
                onBlur={(e) => {
                    validateField("url", e.target.value);
                }}
                onChange={(e) => {
                    setUserData({ ...user, website: e.target.value });
                }}
                onKeyDown={() => clearError("url")}
            />
            <TextField
                error={!!errors?.facebook}
                hint={errors?.facebook || "Facebook cá nhân của bạn"}
                title="Facebook"
                value={facebookUrl}
                onBlur={(e) => {
                    if (validateField("facebook", e.target.value)) {
                        const url = validateFacebookUrl(e.target.value);
                        setFacebookUrl(url);
                        setUserData({
                            ...user,
                            facebook: facebookUrlToHandle(url),
                        });
                    }
                }}
                onChange={(e) => {
                    setFacebookUrl(e.target.value);
                }}
                onKeyDown={() => clearError("facebook")}
            />
            <TextField
                error={!!errors?.twitter}
                hint={errors?.twitter || "Twitter của bạn"}
                title="X (Twitter)"
                value={twitterUrl}
                onBlur={(e) => {
                    if (validateField("twitter", e.target.value)) {
                        const url = validateTwitterUrl(e.target.value);
                        setTwitterUrl(url);
                        setUserData({
                            ...user,
                            twitter: twitterUrlToHandle(url),
                        });
                    }
                }}
                onChange={(e) => {
                    setTwitterUrl(e.target.value);
                }}
                onKeyDown={() => clearError("twitter")}
            />
            <TextArea
                error={!!errors?.bio}
                hint={
                    errors?.bio || (
                        <>
                            Đề xuất: 200 ký tự. Bạn đã dùng{" "}
                            <span className="font-bold">
                                {user.bio?.length || 0}
                            </span>
                        </>
                    )
                }
                title="Tiểu sử"
                value={user.bio || ""}
                onBlur={(e) => {
                    validateField("bio", e.target.value);
                }}
                onChange={(e) => {
                    setUserData({ ...user, bio: e.target.value });
                }}
                onKeyDown={() => clearError("bio")}
            />
        </SettingGroupContent>
    );
};

const ProfileDetails: React.FC<UserDetailProps> = (props) => {
    return (
        <SettingGroup
            border={false}
            customHeader={<CustomHeader>Details</CustomHeader>}
            title="Details"
        >
            <DetailsInputs {...props} />
        </SettingGroup>
    );
};

export default ProfileDetails;
