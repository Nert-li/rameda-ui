// Public API для offers feature
export { useOffersList, useUpdateOffer, useCreateOffer, useDeleteOffer } from './model/use-offer';
export { Component } from "./offers.page";
export { OffersTable } from "./ui/offers-table";
export { CreateOfferForm } from "./ui/create-offer-form";
export { UpdateOfferForm } from "./ui/update-offer-form";
export { OfferActions } from "./ui/offer-actions";
export type { Offer } from "./ui/columns"; 