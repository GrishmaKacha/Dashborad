module.exports = mongoose => {
    const { Schema } = mongoose;
    const ObjectId = Schema.Types.ObjectId;
  
    const schema = Schema(
      {
        _id: ObjectId,
        end_year: Number,
        intensity: Number,
        sector: String,
        topic: String,
        insight: String,
        url: String,
        region: String,
        start_year: Number,
        impact: String,
        added: Date,
        published: Date,
        country: String,
        relevance: String,
        pestle: String,
        source: String,
        title: String,
        likelihood: String
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Tutorial = mongoose.model("Tutorial", schema);
    return Tutorial;
  };
  