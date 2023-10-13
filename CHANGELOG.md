## 0.1.4 - Toggle soft-wrap consideration

Changes:

- Toggling soft-wrap at preferred length were working fine, but I forgot to take into consideration when only toggling soft-wrap, now it’s fix.
- This fix indirectly added a new When to choose (i.e: If wrapping).
- Also, integrating the softWrap config changes into the spec file seems to have fix the need for enabling before disabling the softWrapAtPreferredLineLength in it (still not sure and not sure why).
