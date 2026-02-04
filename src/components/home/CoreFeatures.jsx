export default function CoreFeatures() {
  return (
    <section className="bg-white px-4 py-10 space-y-10">
      {/* TOP FEATURE BANNER */}
      {/* TOP FEATURE IMAGE ONLY */}
      {/* TOP FEATURE IMAGE ONLY */}
      <div className="mx-auto max-w-[400px]">
        <img
          src="/img/core.jpeg"
          alt="Fancy Men's Shirt"
          className="block w-full h-auto object-contain"
        />
      </div>
      {/* IMAGE COLLAGE */}
      {/* IMAGE COLLAGE */}
      <div className="space-y-4">
        {/* TOP ROW */}
        <div className="grid grid-cols-2 gap-4">
          <img
            src="/img/halfsleeve.jpeg"
            className="object-cover h-[260px] w-full"
          />
          <div className="grid grid-rows-2 gap-4">
            <img
              src="/img/core42.jpeg"
              className="object-cover h-full w-full"
            />
            <img
              src="/img/core52.jpeg"
              className="object-cover h-full w-full"
            />
          </div>
        </div>

        {/* BOTTOM ROW — THIS IS THE IMPORTANT PART */}
        <div className="grid grid-cols-4 gap-4">
          {/* BIG IMAGE */}
          <img
            src="/img/core22.jpeg"
            className="col-span-2 h-[120px] w-full object-cover"
          />

          {/* SMALL IMAGE 1 */}
          <img
            src="/img/core3.jpeg"
            className="h-[120px] w-full object-cover"
          />

          {/* SMALL IMAGE 2 */}
          <img
            src="/img/cordyroy.jpeg"
            className="h-[120px] w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
