// import AnnouncementBar from "./AnnouncementBar";
// import DesignSetting from "./DesignSetting";
import Navigation from "./Navigation";
import React from "react";
import SearchableSection from "../../SearchableSection";

export const searchKeywords = {
    design: [
        "trang web",
        "logo",
        "bìa",
        "màu sắc",
        "phông chữ",
        "nền",
        "chủ đề",
        "hiện thị",
        "phong cách",
        "thiết kế & thương hiệu",
        "thiết kế và thương hiệu",
    ],
    navigation: [
        "trang web",
        "điều hướng",
        "menu",
        "chính",
        "phụ",
        "liên kết",
        "cài đặt trang",
    ],
    announcementBar: ["trang web", "thanh thông báo", "quan trọng", "banner"],
};

const SiteSettings: React.FC = () => {
    return (
        <>
            <SearchableSection
                keywords={Object.values(searchKeywords).flat()}
                title="Trang web"
            >
                {/* <DesignSetting keywords={searchKeywords.design} /> */}
                <Navigation keywords={searchKeywords.navigation} />
                {/* <AnnouncementBar keywords={searchKeywords.announcementBar} /> */}
            </SearchableSection>
        </>
    );
};

export default SiteSettings;
