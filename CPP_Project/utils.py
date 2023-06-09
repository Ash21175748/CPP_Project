from docx import Document

def count_words(file):
    total_words_counter = 0
    document = Document(file)
    words_dict = dict()

    for para in document.paragraphs:
        words_list = para.text.lower().split()
        print(words_list)
        total_words_counter += len(para.text.split())

        for word in words_list:

            try:
                words_dict[word] +=1
            except KeyError:
                words_dict[word] = 1

    words_dict = dict(sorted(words_dict.items(), key=lambda kv: kv[1], reverse=True)[:10])

    return words_dict, total_words_counter
