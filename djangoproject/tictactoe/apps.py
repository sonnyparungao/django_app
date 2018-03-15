from django.apps import AppConfig


class TictactoeConfig(AppConfig):
    name = 'tictactoe'
    
    def ready(self):
        import tictactoe.signals