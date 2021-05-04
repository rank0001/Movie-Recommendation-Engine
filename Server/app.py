from flask import Flask,jsonify,json,request
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import difflib
import pandas as pd
from flask_cors import CORS
app = Flask(__name__)
CORS(app)
cors = CORS(app,resources={
    r"/*":{
        "origins":"*"
    }
})

df2 = pd.read_csv('dataset/tmdb.csv')

count = CountVectorizer(stop_words='english')
count_matrix = count.fit_transform(df2['soup'])

cosine_sim2 = cosine_similarity(count_matrix, count_matrix)

df2 = df2.reset_index()
indices = pd.Series(df2.index, index=df2['title'])
all_titles = [df2['title'][i] for i in range(len(df2['title']))]


def get_recommendations(title):
    cosine_sim = cosine_similarity(count_matrix, count_matrix)
    idx = indices[title]
    sim_scores = list(enumerate(cosine_sim[idx]))
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
    sim_scores = sim_scores[1:31]
    movie_indices = [i[0] for i in sim_scores]
    tit = df2['title'].iloc[movie_indices]
    dat = df2['release_date'].iloc[movie_indices]
    return_df = pd.DataFrame(columns=['Title', 'Year'])
    return_df['Title'] = tit
    return_df['Year'] = dat
    return return_df

@app.route('/recommend', methods=['POST'])

def recommendation():
    request_data = json.loads(request.data)
    a = content=request_data['title']
    m_name = a
    result_final = get_recommendations(m_name)
    if m_name not in all_titles:
        return{
            "name": []
        }
    else:
        result_final = get_recommendations(m_name)
        names = []
        dates = []
        for i in range(len(result_final)):
           names.append(result_final.iloc[i][0])
           dates.append(result_final.iloc[i][1]) 
        return {'name': names}

if __name__ == "__main__":
    app.run(debug=True)