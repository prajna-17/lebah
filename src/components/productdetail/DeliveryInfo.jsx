export default function DeliveryInfo() {
  return (
    <section className="px-4 mt-20">
      <div className="grid grid-cols-3 gap-4 text-center">
        {/* FREE SHIPPING */}
        <div className="flex flex-col items-center gap-2">
          <img
            src="/img/free-shipping.png"
            alt="Free Shipping"
            className="w-8 h-8 object-contain"
          />
          <p className="text-sm font-semibold text-gray-900">Free Shipping</p>
        </div>

        {/* RETURN */}
        <div className="flex flex-col items-center gap-2">
          <img
            src="/img/return.png"
            alt="7 Days Return"
            className="w-8 h-8 object-contain"
          />
          <p className="text-sm font-semibold text-gray-900 text-center">
            7 Days return <br /> & Exchange
          </p>
        </div>

        {/* COD */}
        <div className="flex flex-col items-center gap-2">
          <img
            src="/img/cod.png"
            alt="COD Available"
            className="w-8 h-8 object-contain"
          />
          <p className="text-sm font-semibold text-gray-900">COD Available</p>
        </div>
      </div>
    </section>
  );
}
