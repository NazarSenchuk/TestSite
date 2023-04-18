def get_rating(rating,len_questions):
    print(rating )
    print(len_questions)
    rating = rating / len_questions * 12
    return rating
def has_is_owner( request_user, object ):
    if request_user == object.user:
        return True
    else:
        return False