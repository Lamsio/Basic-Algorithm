// 1 -2 +3 -4 +5 -6 +7 ....
// 求总和
static int getResult(int n)
{
    if (n == 1)
    {
        return 1;
    }
    if (n % 2 == 0)
    {
        return getResult(n - 1) - n;
    }
    else
    {
        return getResult(n - 1) + n;
    }
}

static int getSkipResult(int n)
{
    if (n == 1)
    {
        return 1;
    }

    if (n == 0)
    {
        return 0;
    }
    
    if (n % 2 == 0)
    {
        return -(n / 2);
    }
    else
    {
        return n - (n / 2);
    }
}
