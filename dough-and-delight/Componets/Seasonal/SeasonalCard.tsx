import Image from "next/image";

interface SeasonalCardProps {
  image: string;
  title: string;
  price: number;
  badge: string;
}

const SeasonalCard = ({
  image,
  title,
  price,
  badge,
}: SeasonalCardProps) => {
  return (
    <div
      className="
        group
        animate-fadeIn
        bg-white
        rounded-3xl
        overflow-hidden
        shadow-md
        hover:shadow-2xl
        transition-all
        duration-500
        border border-[#f1e5db]
        hover:-translate-y-2
      "
    >

      <div
        className="
          relative
          w-full
          h-[220px]
          sm:h-[260px]
          md:h-[300px]
          bg-gradient-to-br
          from-[#fff8f3]
          to-[#f6eee7]
          flex
          items-center
          justify-center
          overflow-hidden
        "
      >

        <div className="absolute w-40 h-40 bg-[#f4d7c7] rounded-full blur-3xl opacity-40" />

        <Image
          src={image}
          alt={title}
          fill
          className="
            object-contain
            p-6
            group-hover:scale-110
            transition-transform
            duration-500
          "
        />

        <div
          className="
            absolute
            top-4
            left-4
            bg-[#8B2E1E]
            text-white
            text-[11px]
            sm:text-xs
            font-semibold
            px-4
            py-1.5
            rounded-full
            shadow-lg
            tracking-wide
          "
        >
          {badge}
        </div>

      </div>

      <div className="p-5 sm:p-6">

        <h3
          className="
            text-lg
            sm:text-xl
            font-bold
            text-[#5c2b1d]
            line-clamp-1
          "
        >
          {title}
        </h3>

        <div className="flex items-center justify-between mt-4">

          <p
            className="
              text-[#823920]
              text-xl
              sm:text-2xl
              font-extrabold
            "
          >
            ₹{price}
          </p>

          <button
            className="
              bg-[#8B2E1E]
              hover:bg-[#6f2417]
              text-white
              text-sm
              sm:text-base
              px-5
              py-2
              rounded-full
              font-medium
              transition-all
              duration-300
              shadow-md
            "
          >
            Add
          </button>

        </div>

      </div>
    </div>
  );
};

export default SeasonalCard;