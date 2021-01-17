export const REVIEW_PAGE_SIZE = 20

export enum UserType {
    admin = 'admin',
    user = 'user'
}

export enum FeedbackStars {
    notEffective = 1,
    minimallyEffective = 2,
    effective = 3,
    highlyEffective = 4,
    exceptional = 5
}

export enum FeedbackStatus {
    assigned = 'assigned',
    completed = 'completed'
}