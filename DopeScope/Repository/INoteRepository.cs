﻿using DopeScope.Models;
using System.Collections.Generic;

namespace DopeScope.Repository
{
    public interface INoteRepository
    {
        void Add(Note note);
        void Delete(int id);
        List<Note> GetAll();
        Note GetById(int id);
        void Update(Note note);
    }
}