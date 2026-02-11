export default function BenefitsBanner() {
  return (
    <section className="relative w-full mt-10 h-[200px]">
      {/* Background Image */}
      <img
        src="/img/back.png"
        alt="Benefits"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Dark Blue Overlay */}
      <div className="absolute inset-0 bg-[#0b1d3a]/80"></div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="grid grid-cols-3 gap-9 text-center text-white">
          {/* Item 1 */}
          <div>
            <img
              src="/img/e1.png"
              alt="Free Shipping"
              className="mx-auto w-10 mb-4"
            />
            <p className="text-sm font-medium">
              Free shipping <br /> on every order
            </p>
          </div>

          {/* Item 2 */}
          <div>
            <img
              src="/img/e2.png"
              alt="Assured Quality"
              className="mx-auto w-10 mb-4"
            />
            <p className="text-sm font-medium">Assured Quality</p>
          </div>

          {/* Item 3 */}
          <div>
            <img
              src="/img/e3.png"
              alt="Special Offers"
              className="mx-auto w-10 mb-4"
            />
            <p className="text-sm font-medium">
              Get special offers <br /> on your first order
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
