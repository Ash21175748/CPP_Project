from django.shortcuts import render
from django.http import JsonResponse
from django.views.generic import TemplateView
from .utils import count_words

class MainView(TemplateView):
    template_name = 'main.html'


def upload_document(request):
    if request.method == "POST":
        file = request.FILES.get('file')
        words_dict, total_words_counter = count_words(file)

    return JsonResponse({'words_dict': words_dict, 'total_words_counter': total_words_counter})
