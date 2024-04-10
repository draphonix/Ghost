import React from "react";
import TopLevelGroup from "../../TopLevelGroup";
import { Button, withErrorBoundary } from "@tryghost/admin-x-design-system";
import { useRouting } from "@tryghost/admin-x-framework/routing";

const Navigation: React.FC<{ keywords: string[] }> = ({ keywords }) => {
    const { updateRoute } = useRouting();
    const openPreviewModal = () => {
        updateRoute("navigation/edit");
    };

    return (
        <TopLevelGroup
            customButtons={
                <Button
                    color="green"
                    label="Tuỳ chỉnh"
                    link
                    linkWithPadding
                    onClick={openPreviewModal}
                />
            }
            description="Cài đặt các menu chính và phụ của trang web."
            keywords={keywords}
            navid="navigation"
            testId="navigation"
            title="Cài đặt trang"
        />
    );
};

export default withErrorBoundary(Navigation, "Cài đặt trang");
