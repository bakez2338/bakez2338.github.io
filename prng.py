from math import floor
class PRNG:
    def __init__(self, m, a, c, seed):
        self.m = m
        self.a = a
        self.c = c
        self.v = seed
        self.s = seed
    def seed(self, seed):
        self.v = seed
        self.s = seed
    def reset(self):
        self.v = self.s
    def random(self, min=0, max=1, int=False):
        self.v = (self.v * self.a + self.c) % self.m
        scaled = self.v / (self.m - 1)
        r = max - min
        r = r * scaled
        r += min
        if int:
            return floor(r)
        else:
            return r