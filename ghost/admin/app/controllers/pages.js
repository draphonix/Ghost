import PostsController from "./posts";
import { action } from "@ember/object";
import { inject as service } from "@ember/service";

const TYPES = [
    {
        name: "Tất cả các trang",
        value: null,
    },
    {
        name: "Trang nháp",
        value: "draft",
    },
    {
        name: "Trang đã xuất bản",
        value: "published",
    },
    {
        name: "Trang đã lên lịch",
        value: "scheduled",
    },
    {
        name: "Trang nổi bật",
        value: "featured",
    },
];

const ORDERS = [
    {
        name: "Mới nhất",
        value: null,
    },
    {
        name: "Cũ nhất",
        value: "published_at asc",
    },
    {
        name: "Mới update",
        value: "updated_at desc",
    },
];

export default class PagesController extends PostsController {
    @service router;

    availableTypes = TYPES;
    availableOrders = ORDERS;

    @action
    openEditor(page) {
        this.router.transitionTo("lexical-editor.edit", "page", page.get("id"));
    }
}
