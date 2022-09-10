export const createRequiredMediumString = (string) => ({
    type: String,
    required: [true, `${string} is required`],
    validate: {
        validator: (string) => string.length > 2,
        message: `${string} is too short`
    }
})

export const createRequiredString = (string) => ({
    type: String,
    required: [true, `${string} is required`]
})