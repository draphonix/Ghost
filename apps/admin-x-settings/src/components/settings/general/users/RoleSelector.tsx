import { Heading, Icon, Radio } from "@tryghost/admin-x-design-system";
import { User, isOwnerUser } from "@tryghost/admin-x-framework/api/users";
import { useBrowseRoles } from "@tryghost/admin-x-framework/api/roles";

const RoleSelector: React.FC<{
    user: User;
    setUserData: (user: User) => void;
}> = ({ user, setUserData }) => {
    const { data: { roles } = {} } = useBrowseRoles();

    if (isOwnerUser(user)) {
        return (
            <>
                <Heading level={6}>Role</Heading>
                <div className="flex h-[295px] flex-col items-center justify-center gap-3 bg-grey-75 px-10 py-20 text-center text-sm text-grey-800 dark:bg-grey-950 dark:text-white">
                    <Icon
                        colorClass="text-grey-800 dark:text-white"
                        name="crown"
                        size="lg"
                    />
                    This user is the owner of the site. To change their role,
                    you need to transfer the ownership first.
                </div>
            </>
        );
    }

    return (
        <Radio
            id="role"
            options={[
                {
                    hint: "Có thể tạo bài viết nhưng không thể publish, sẽ cần tổng biên tập duyệt",
                    label: "Cộng tác viên",
                    value: "contributor",
                },
                {
                    hint: "Có thể quản lý và duyệt bài viết của người khác",
                    label: "Tổng biên tập",
                    value: "editor",
                },
                {
                    hint: "Có đầy đủ quyền hạn trên trang web",
                    label: "Administrator",
                    value: "administrator",
                },
            ]}
            selectedOption={user.roles[0].name.toLowerCase()}
            title="Role"
            onSelect={(value) => {
                const role = roles?.find(
                    (r) => r.name.toLowerCase() === value.toLowerCase()
                );
                if (role) {
                    setUserData?.({ ...user, roles: [role] });
                }
            }}
        />
    );
};

export default RoleSelector;
