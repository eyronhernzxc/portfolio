import { lazy, Suspense } from "react";
import { useLocation } from "react-router-dom";
import PageLoading from "@/components/page-loading";
import {HashLoader} from "react-spinners";

const modules = import.meta.glob("./blogs/**/index.tsx");

const BlogPage = () => {
    const { pathname } = useLocation();

    const key = `.${pathname}/index.tsx`;

    const importer = modules[key];

    if (!importer) {
        return <div>Blog not found</div>;
    }

    const BlogComponent = lazy(() =>
        importer().then((mod: any) => ({
            default: mod.default,
        }))
    );

    return (
        <Suspense fallback={<PageLoading />}>
            <BlogComponent />
        </Suspense>
    );
};

export default BlogPage;
