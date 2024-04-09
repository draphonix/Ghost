import CodeInjection from "./CodeInjection";
import History from "./History";
import Integrations from "./Integrations";
import React from "react";
import SearchableSection from "../../SearchableSection";
// import Labs from "./Labs";

export const searchKeywords = {
    integrations: [
        "nâng cao",
        "tích hợp",
        "zapier",
        "slack",
        "amp",
        "unsplash",
        "người khuyến mãi đầu tiên",
        "firstpromoter",
        "pintura",
        "disqus",
        "analytics",
        "ulysses",
        "typeform",
        "buffer",
        "plausible",
        "github",
    ],
    migrationtools: [
        "nhập khẩu",
        "xuất khẩu",
        "di chuyển",
        "substack",
        "substack",
        "di cư",
        "medium",
    ],
    codeInjection: ["nâng cao", "tiêm mã", "đầu", "chân trang"],
    labs: [
        "nâng cao",
        "phòng thí nghiệm",
        "alpha",
        "beta",
        "cờ",
        "đường dẫn",
        "điều hướng",
        "dịch",
        "biên tập viên",
        "cổng",
    ],
    history: [
        "nâng cao",
        "lịch sử",
        "nhật ký",
        "sự kiện",
        "sự kiện người dùng",
        "nhân viên",
    ],
    dangerzone: [
        "nguy hiểm",
        "khu vực nguy hiểm",
        "xóa",
        "nội dung",
        "xóa tất cả nội dung",
        "xóa trang web",
    ],
};

const AdvancedSettings: React.FC = () => {
    return (
        <SearchableSection
            keywords={Object.values(searchKeywords).flat()}
            title="Advanced"
        >
            <Integrations keywords={searchKeywords.integrations} />
            {/* <MigrationTools keywords={searchKeywords.migrationtools} /> */}
            <CodeInjection keywords={searchKeywords.codeInjection} />
            {/* <Labs keywords={searchKeywords.labs} /> */}
            <History keywords={searchKeywords.history} />
            {/* <DangerZone keywords={searchKeywords.dangerzone} /> */}
        </SearchableSection>
    );
};

export default AdvancedSettings;
