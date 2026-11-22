import { Container } from "@/components/ui/Container";
import { ProductGridSkeleton, Skeleton } from "@/components/ui/LoadingSkeleton";

export default function Loading() {
  return (
    <Container className="pb-20 pt-10 md:pt-16">
      <div className="mx-auto mb-12 flex flex-col items-center gap-3">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-12 w-64" />
      </div>
      <ProductGridSkeleton />
    </Container>
  );
}
