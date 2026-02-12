// src/utils/review.js

const names = [
  "Darrell Steward",
  "Darlene Robertson",
  "Kathryn Murphy",
  "Esther Howard",
  "Brooklyn Simmons",
  "Savannah Nguyen",
  "Cody Fisher",
  "Ralph Edwards",
  "Jenny Wilson",
  "Jacob Jones",
  "Kristin Watson",
  "Guy Hawkins",
  "Marvin McKinney",
  "Floyd Miles",
  "Courtney Henry",
  "Albert Flores",
  "Theresa Webb",
  "Leslie Alexander",
  "Ronald Richards",
  "Wade Warren",
];

const comments = [
  "Amazing quality! Fabric feels premium.",
  "Very comfortable and stylish.",
  "Worth the price. Highly recommended.",
  "Perfect fitting and classy look.",
  "Good product, delivery was smooth.",
  "Absolutely loved it ❤️",
  "Looks exactly like the pictures.",
  "Super comfortable for daily wear.",
  "Material quality is impressive.",
  "Value for money product.",
  "Will definitely buy again.",
  "Packaging was neat and clean.",
  "Feels very premium for this price.",
  "Size fits perfectly.",
  "Great purchase decision.",
  "Elegant and stylish design.",
  "Soft and breathable fabric.",
  "Nice stitching and finish.",
  "Received many compliments wearing this.",
  "Exceeded my expectations.",
];

function randomDate() {
  const start = new Date(2023, 0, 1);
  const end = new Date();
  const date = new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime()),
  );

  return date.toLocaleString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function randomAvatar(index) {
  return `https://i.pravatar.cc/150?img=${(index % 70) + 1}`;
}

export function getRandomReviews(count = 50) {
  const reviews = [];

  for (let i = 0; i < count; i++) {
    const rating = Math.floor(Math.random() * 2) + 4; // 4 or 5 stars

    reviews.push({
      id: i + 1,
      name: names[Math.floor(Math.random() * names.length)],
      rating,
      comment: comments[Math.floor(Math.random() * comments.length)],
      date: randomDate(),
      likes: Math.floor(Math.random() * 300),
      avatar: randomAvatar(i),
    });
  }

  return reviews;
}
