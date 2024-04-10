import React from "react";

import Facebook from "./Facebook";
import LockSite from "./LockSite";
import Metadata from "./Metadata";
import PublicationLanguage from "./PublicationLanguage";
import SearchableSection from "../../SearchableSection";
import SocialAccounts from "./SocialAccounts";
import TimeZone from "./TimeZone";
import TitleAndDescription from "./TitleAndDescription";
import Twitter from "./Twitter";
import Users from "./Users";

export const searchKeywords = {
    titleAndDescription: [
        "chung",
        "tiêu đề và mô tả",
        "tiêu đề trang web",
        "mô tả trang web",
        "tiêu đề & mô tả",
    ],
    timeZone: ["chung", "thời gian", "ngày", "múi giờ trang web", "múi giờ"],
    publicationLanguage: ["chung", "ngôn ngữ xuất bản", "bản địa hóa"],
    metadata: [
        "chung",
        "metadata",
        "tiêu đề",
        "mô tả",
        "tìm kiếm",
        "máy tìm kiếm",
        "google",
        "dữ liệu meta",
    ],
    twitter: [
        "chung",
        "thẻ twitter",
        "dữ liệu có cấu trúc",
        "thẻ phong phú",
        "x card",
        "xã hội",
    ],
    facebook: [
        "chung",
        "thẻ facebook",
        "dữ liệu có cấu trúc",
        "thẻ phong phú",
        "xã hội",
    ],
    socialAccounts: [
        "chung",
        "tài khoản xã hội",
        "facebook",
        "twitter",
        "dữ liệu có cấu trúc",
        "thẻ phong phú",
    ],
    lockSite: [
        "chung",
        "bảo vệ mật khẩu",
        "khóa trang web",
        "làm trang web này trở nên riêng tư",
    ],
    users: [
        "chung",
        "người dùng và quyền",
        "vai trò",
        "nhân viên",
        "mời mọi người",
        "người đóng góp",
        "biên tập viên",
        "tác giả",
        "quản trị viên",
    ],
};

const GeneralSettings: React.FC = () => {
    return (
        <SearchableSection
            keywords={Object.values(searchKeywords).flat()}
            title="Cài đặt chung"
        >
            <TitleAndDescription
                keywords={searchKeywords.titleAndDescription}
            />
            <TimeZone keywords={searchKeywords.timeZone} />
            <PublicationLanguage
                keywords={searchKeywords.publicationLanguage}
            />
            <Metadata keywords={searchKeywords.metadata} />
            <Twitter keywords={searchKeywords.twitter} />
            <Facebook keywords={searchKeywords.facebook} />
            <SocialAccounts keywords={searchKeywords.socialAccounts} />
            <LockSite keywords={searchKeywords.lockSite} />
            <Users keywords={searchKeywords.users} />
        </SearchableSection>
    );
};

export default GeneralSettings;
