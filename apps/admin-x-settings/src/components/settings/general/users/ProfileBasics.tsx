import CustomHeader from "./CustomHeader";
import RoleSelector from "./RoleSelector";
import {
    SettingGroup,
    SettingGroupContent,
    TextField,
} from "@tryghost/admin-x-design-system";
import { UserDetailProps } from "../UserDetailModal";
import { hasAdminAccess } from "@tryghost/admin-x-framework/api/users";
import { useGlobalData } from "../../../providers/GlobalDataProvider";

const BasicInputs: React.FC<UserDetailProps> = ({
    errors,
    validateField,
    clearError,
    user,
    setUserData,
}) => {
    const { currentUser } = useGlobalData();

    return (
        <SettingGroupContent>
            <TextField
                error={!!errors?.name}
                hint={
                    errors?.name ||
                    "Hãy sử dụng tên thật để người khác dễ nhận biết bạn"
                }
                title="Họ và Tên"
                value={user.name}
                onBlur={(e) => {
                    validateField("name", e.target.value);
                }}
                onChange={(e) => {
                    setUserData({ ...user, name: e.target.value });
                }}
                onKeyDown={() => clearError("name")}
            />
            <TextField
                error={!!errors?.email}
                hint={errors?.email || "Để gửi thông báo"}
                title="Email"
                value={user.email}
                onBlur={(e) => {
                    validateField("email", e.target.value);
                }}
                onChange={(e) => {
                    setUserData({ ...user, email: e.target.value });
                }}
                onKeyDown={() => clearError("email")}
            />
            <TextField
                hint="https://example.com/author"
                title="Slug"
                value={user.slug}
                onChange={(e) => {
                    setUserData({ ...user, slug: e.target.value });
                }}
            />
            {hasAdminAccess(currentUser) && (
                <RoleSelector setUserData={setUserData} user={user} />
            )}
        </SettingGroupContent>
    );
};

const ProfileBasics: React.FC<UserDetailProps> = (props) => {
    return (
        <SettingGroup
            border={false}
            customHeader={<CustomHeader>Thông tin cơ bản</CustomHeader>}
            title="Basic"
        >
            <BasicInputs {...props} />
        </SettingGroup>
    );
};

export default ProfileBasics;
