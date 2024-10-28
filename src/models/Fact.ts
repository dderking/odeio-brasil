import mongoose from 'mongoose';

const factSchema = new mongoose.Schema({
  fact: {
    type: String,
    required: true
  }
});

export const Fact = mongoose.models.Fact || mongoose.model('Fact', factSchema);
