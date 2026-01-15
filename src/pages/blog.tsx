import { lazy, Suspense } from "react";
import { useLocation } from "react-router-dom";
import PageLoading from "@/components/page-loading";
import NotFound from "@/pages/not-found.tsx";

const modules = import.meta.glob("./blogs/**/index.tsx");

const BlogPage = () => {
    const { pathname } = useLocation();

    const key = `.${pathname}/index.tsx`;

    const importer = modules[key];

    if (!importer) {
        return <NotFound />;

    }

    const BlogComponent = lazy(() =>
        importer().then((mod: any) => ({
            default: mod.default,
        }))
    );

    return (
        <Suspense fallback={<PageLoading />}>
            <main className=" relative">
                <BlogComponent />
            </main>
        </Suspense>
    );
};

export default BlogPage;
