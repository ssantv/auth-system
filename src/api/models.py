from __future__ import annotations
from typing import List

from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = "users"
    id: Mapped[int] = mapped_column(primary_key=True)
    username: Mapped[str] = mapped_column(nullable=False, unique=True)
    email: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)
    password: Mapped[str] = mapped_column(nullable=False)

    secrets: Mapped[List["Secret"]] = relationship("Secret", back_populates="user")

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "username": self.username
        }
    
class Secret(db.Model):
    __tablename__ = "secrets"
    id: Mapped[int] = mapped_column(primary_key=True)
    text: Mapped[str] = mapped_column(String(240), nullable=False)

    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), nullable=False)
    user: Mapped["User"] = relationship("User", back_populates="secrets")
