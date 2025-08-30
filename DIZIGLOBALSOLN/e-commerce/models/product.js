const mongoose = require("mongoose");

// FAQ Schema
const faqSchema = new mongoose.Schema({
  question: {
    type: String,
    required: [true, "FAQ question is required"],
  },
  answer: {
    type: String,
    required: [true, "FAQ answer is required"],
  },
});

// Review Schema
const reviewSchema = new mongoose.Schema({
  user: {
    type: String,
    required: [true, "Reviewer name is required"],
  },
  rating: {
    type: Number,
    min: [1, "Rating must be at least 1"],
    max: [5, "Rating cannot be more than 5"],
    required: [true, "Rating is required"],
  },
  comment: {
    type: String,
    required: [true, "Review comment is required"],
  },
});

// Product Schema
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
    },
    price: {
      type: Number,
      required: [true, "Product price is required"],
    },
    discountPrice: {
      type: Number,
    },
    aboutProduct: {
      introduction: { type: String, required: true },
      ekavaktra: { type: String },
      historySignificance: { type: String },
      astrologicalImportance: { type: String },
      howToWear: [{ type: String }],
      dosAndDonts: {
        dos: [String],
        donts: [String],
      },
      thingsToRemember: [String],
    },
    description: {
      type: String,
      required: [true, "Product description (About Product) is required"],
    },
    benefits: {
      heading: { type: String, required: true },
      intro: { type: String },
      points: [
        {
          title: { type: String, required: true },
          description: { type: String, required: true },
        },
      ],
    },
    faqs: [faqSchema],
    shippingAndReturn: {
      shippingPolicy: {
        shippingTime: { type: String, required: true },
        shippingLocations: { type: [String], required: true },
        shippingCharges: { type: String, required: true },
        packagingHandling: { type: String, required: true },
        trackingOrder: { type: String, required: true },
        deliveryDelays: { type: String },
        nonDeliveryScenarios: { type: [String] },
      },
      returnRefundPolicy: {
        returnPolicy: { type: String, required: true },
        refundPolicy: { type: String, required: true },
        whatYouNeedToDo: { type: String },
        exchangePolicy: { type: String },
        noRefundReturnFor: { type: [String] },
        ourCommitment: { type: String },
      },
    },
    reviews: [reviewSchema],
    images: {
      type: [String],
      required: [true, "At least one product image is required"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
